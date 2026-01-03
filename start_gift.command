#!/bin/bash
cd "$(dirname "$0")"
IP=$(ipconfig getifaddr en0)

# Clear terminal
clear

echo "======================================================="
echo "   💝 Starting Your 6th Anniversary Gift..."
echo "======================================================="
echo ""
echo "👉 1. Make sure your iPhone is on the same Wi-Fi."
echo "👉 2. Open Safari on your iPhone."
echo "👉 3. Type this URL:"
echo ""
echo "     http://$IP:8000"
echo ""
echo "======================================================="
echo "   (Keep this window open while using the link)"
echo "======================================================="
echo ""

# Open on Mac automatically
open "http://localhost:8000"

# Start Server
python3 -m http.server 8000
