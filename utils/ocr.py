import cv2
import pytesseract

img = cv2.imread("assets/stock_sheet.jpg")
config = r"--oem 3 --psm 6"

tess_output = pytesseract.image_to_string(img, config=config)
print(tess_output)