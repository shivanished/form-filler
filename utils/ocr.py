import cv2
import pytesseract
from wand.image import Image
from wand.color import Color


input_image_path = "assets/stock_sheet.jpg"

with Image(filename=input_image_path) as img:
    # Add a white border
    img.border(color=Color('white'), width=10, height=10)

    # Save the modified image
    new_filename = str(input_image_path.split('.')[0]) + "_border.jpg"
    img.save(filename=new_filename)

print("Image processing complete.")

img = cv2.imread(new_filename)
config = r"--oem 3 --psm 6"

tess_output = pytesseract.image_to_string(img, config=config)
print(tess_output)