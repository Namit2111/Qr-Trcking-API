from fastapi import APIRouter, HTTPException, Response,Request
from fastapi.responses import FileResponse, RedirectResponse
from pydantic import BaseModel
from app.utils import qrgen, checkurl
from app.config.mongo import get_database
from datetime import datetime
import re

router = APIRouter(prefix="/qr", tags=["QR Code"])

class QRRequest(BaseModel):
    url: str

class QRResponse(BaseModel):
    url: str
    tracking_url: str
    open_count: int = 0

class ScanData(BaseModel):
    timestamp: datetime
    ip_address: str
    user_agent: str

def detect_device(user_agent: str) -> str:
    # Check for mobile devices
    mobile_pattern = r'(?i)(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino'
    tablet_pattern = r'(?i)(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk'
    
    if re.search(mobile_pattern, user_agent):
        return "mobile"
    elif re.search(tablet_pattern, user_agent):
        return "tablet"
    else:
        return "desktop"

@router.post("/trackable", response_model=QRResponse)
async def generate_trackable_qr(request: QRRequest):
    # Check if the URL is valid
    status_code = checkurl.check(request.url)
    if status_code != "200":
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    # Get database connection
    db = get_database()
    links = db.links
    
    # Check if link already exists
    existing_link = links.find_one({"url": request.url})
    
    if existing_link:
        # If link exists, use existing tracking URL
        tracking_url = f"/track?link={request.url}"
        return QRResponse(
            url=request.url,
            tracking_url=tracking_url,
            open_count=existing_link.get("open_count", 0)
        )
    else:
        # If link doesn't exist, create new entry
        link_data = {
            "url": request.url,
            "open_count": 0,
            "scans": [],
            "created_at": datetime.utcnow()
        }
        links.insert_one(link_data)
        tracking_url = f"/track?link={request.url}"
        return QRResponse(
            url=request.url,
            tracking_url=tracking_url,
            open_count=0
        )

@router.get("/track")
async def track_link(link: str, request: Request):
    # Get database connection
    db = get_database()
    links = db.links
    
    # Extract the original URL from the tracking URL
    # The link parameter will be in format: hosturl+/track?link=user_Data
    try:
        # Remove the host URL and /track?link= part to get the original URL
        original_url = link
    except:
        raise HTTPException(status_code=400, detail="Invalid tracking URL format")
    
    # Find the link in database
    link_data = links.find_one({"url": original_url})
    if not link_data:
        raise HTTPException(status_code=404, detail="Link not found")
    
    # Get user agent and detect device
    user_agent = request.headers.get("user-agent", "Unknown")
    device_type = detect_device(user_agent)
    
    # Record scan data
    scan_data = {
        "timestamp": datetime.utcnow(),
        "ip_address": request.client.host,
        "user_agent": user_agent,
        "device_type": device_type
    }
    
    # Update database with new scan
    links.update_one(
        {"url": original_url},
        {
            "$inc": {"open_count": 1},
            "$push": {"scans": scan_data}
        }
    )
    
    # Redirect to original URL
    return RedirectResponse(url=original_url)

@router.get("/stats/{url}")
async def get_link_stats(url: str):
    # Get database connection
    db = get_database()
    links = db.links
    
    # Find the link in database
    link_data = links.find_one({"url": url})
    if not link_data:
        raise HTTPException(status_code=404, detail="Link not found")
    
    # Return stats
    return {
        "url": link_data["url"],
        "open_count": link_data.get("open_count", 0),
        "scans": link_data.get("scans", []),
        "created_at": link_data.get("created_at")
    }
