import json
from PIL import Image

img_data_0 = []
img_data_1 = []
img_data_2 = []
img_data_3 = []
img_data_4 = []
img_data_5 = []
img_data_6 = []
img_data_7 = []
img_data_8 = []

with open('image-rec/static/training_data_sample.json', 'r') as tds:
	tdst = tds.read()
img_data_0 = json.loads(tdst)[0][1]
img_data_1 = json.loads(tdst)[1][1]
img_data_2 = json.loads(tdst)[2][1]
img_data_3 = json.loads(tdst)[3][1]
img_data_4 = json.loads(tdst)[4][1]
img_data_5 = json.loads(tdst)[5][1]
img_data_6 = json.loads(tdst)[6][1]
img_data_7 = json.loads(tdst)[7][1]
img_data_8 = json.loads(tdst)[8][1]

img = Image.new('RGB', (84, 84), 'black')
img_map = img.load()

for i in range(len(img_data_0)):
	img_map[i % 28, i//28] = (round(img_data_0[i]*255), round(img_data_0[i]*255), round(img_data_0[i]*255))
for i in range(len(img_data_1)):
	img_map[i % 28 + 28, i//28] = (round(img_data_1[i]*255), round(img_data_1[i]*255), round(img_data_1[i]*255))
for i in range(len(img_data_2)):
	img_map[i % 28 + 56, i//28] = (round(img_data_2[i]*255), round(img_data_2[i]*255), round(img_data_2[i]*255))
for i in range(len(img_data_3)):
	img_map[i % 28, i//28 + 28] = (round(img_data_3[i]*255), round(img_data_3[i]*255), round(img_data_3[i]*255))
for i in range(len(img_data_4)):
	img_map[i % 28 + 28, i//28 + 28] = (round(img_data_4[i]*255), round(img_data_4[i]*255), round(img_data_4[i]*255))
for i in range(len(img_data_5)):
	img_map[i % 28 + 56, i//28 + 28] = (round(img_data_5[i]*255), round(img_data_5[i]*255), round(img_data_5[i]*255))
for i in range(len(img_data_6)):
	img_map[i % 28, i//28 + 56] = (round(img_data_6[i]*255), round(img_data_6[i]*255), round(img_data_6[i]*255))
for i in range(len(img_data_7)):
	img_map[i % 28 + 28, i//28 + 56] = (round(img_data_7[i]*255), round(img_data_7[i]*255), round(img_data_7[i]*255))
for i in range(len(img_data_8)):
	img_map[i % 28 + 56, i//28 + 56] = (round(img_data_8[i]*255), round(img_data_8[i]*255), round(img_data_8[i]*255))


img.save('test.png', 'PNG')

# with open('image-rec/static/training-data-1.json', 'r') as f1:
# 	data_1 = json.loads(f1.read())

# sample = []

# for i in range(10):
# 	sample.append(data_1[i])

# with open('image-rec/static/training_data_sample.json', 'w') as tds:
# 	tds.write(json.dumps(sample, indent=4))
# 	print(sample)