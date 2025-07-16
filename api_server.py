from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
from typing import Literal, Optional
from pydantic import BaseModel
import socket
import json
import sys
import os

project_root = Path(__file__).parent
crawler_root = project_root / "MediaCrawler"
os.chdir(str(crawler_root))
sys.path.insert(0, str(Path(__file__).parent / "MediaCrawler"))

from tools import utils
import config
from media_platform.xhs.core import XiaoHongShuCrawler

app = FastAPI()

JSON_STORE_PATH = Path("data/xhs/json")

# --- utils ---------------------------------------------------------

# crawlerType: search|creator|detail
# contentType: contents|comments|creator
def _get_store_path(crawlerType: str, contentType: str, dateStr: Optional[str] = None) -> Path:
    if crawlerType not in {"search", "creator", "detail"}:
        raise ValueError(crawlerType)
    if contentType not in {"contents", "comments", "creator"}:
        raise ValueError(contentType)

    curDate = dateStr or utils.get_current_date()
    return Path(f"{JSON_STORE_PATH}/{crawlerType}_{contentType}_{curDate}.json") 


def get_local_ip():
    # open a dummy UDP socket to a public address and read the socket’s own address
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        try:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
        except OSError:
            return "127.0.0.1"  # fallback
          
# --- API EndPoints -------------------------------------------------

class Note(BaseModel):
    note_id: str
    type: Literal["normal", "video"]
    title: str
    desc: Optional[str] = None
    video_url: Optional[str] = None
    time: int
    last_update_time: int
    user_id: str
    nickname: str
    avatar: str
    liked_count: Optional[str] = None
    collected_count: Optional[str] = None
    comment_count: Optional[str] = None
    share_count: Optional[str] = None
    ip_location: Optional[str] = None
    image_list: Optional[str] = None
    tag_list: Optional[str] = None
    last_modify_ts: int
    note_url: str
    source_keyword: Optional[str] = None
    xsec_token: str

@app.get("/searchItem", response_model=list[Note])
async def searchItem(item: str, count: int = 20):
    """Trigger the crawler and return its JSON output.

    Query params
    ----------
    - **item**:  the search term / keyword your crawler should scrape
    - **count**: number of results you want (default 20)

    """

    config.ENABLE_CDP_MODE = True
    config.CRAWLER_MAX_NOTES_COUNT = count
    config.LOGIN_TYPE = "qrcode"
    config.KEYWORDS = item
    config.ENABLE_GET_COMMENTS = False
    config.ENABLE_GET_SUB_COMMENTS = False
    config.SAVE_DATA_OPTION = 'json'
    config.CRAWLER_TYPE = (
        "search"
        )

    crawler = XiaoHongShuCrawler()
    await crawler.start()

    dataPath = _get_store_path("search", "contents")

    try:
        data = json.loads(dataPath.read_text(encoding='utf-8'))
    except json.JSONDecodeError as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Failed to parse JSON: {exc}") from exc

    return data

@app.post("/searchUser")
async def searchItem(userIdList: list[str]): 
# async def searchUser():
    """Trigger the crawler and return its JSON output.

    Query params
    ----------
    - **userId**: xhs user id
    """

    config.XHS_CREATOR_ID_LIST = ["5a372d7f4eacab1df9228ec0"]
    config.ENABLE_CDP_MODE = True
    config.LOGIN_TYPE = "qrcode"
    config.ENABLE_GET_COMMENTS = False
    config.ENABLE_GET_SUB_COMMENTS = False
    config.SAVE_DATA_OPTION = 'json'
    config.CRAWLER_TYPE = (
        "creator"
        )

    crawler = XiaoHongShuCrawler()
    await crawler.start()
    # await crawler.get_only_creators()
    dataPath = _get_store_path("creator", "creator")

    try:
        data = json.loads(dataPath.read_text(encoding='utf-8'))
    except json.JSONDecodeError as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"Failed to parse JSON: {exc}") from exc

    return data

        
if __name__ == "__main__":
    ip = get_local_ip()
    print(f"🖧 Your server’s LAN IP is: http://{ip}:8000")

    import uvicorn
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
# ---------------------------------------------------------------------------
# Running instructions (inside your uv environment)
# ---------------------------------------------------------------------------
# 1) Install dependencies in your uv-managed venv:
#    uv pip install fastapi "uvicorn[standard]"
#
# ---------------------------------------------------------------------------



