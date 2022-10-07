from PIL import Image
import json

with open(r'image-rec\static\training-data-1.json') as f:
    data = json.loads(f.read())
print(len(data))
with open(r'image-rec\static\td1.mjs', 'w') as f:
    f.write(json.dumps(data[0:5000], indent=4))
print(len(data[0:5000]))
with open(r'image-rec\static\td2.mjs', 'w') as f:
    f.write(json.dumps(data[5000:10000], indent=4))
print(len(data[5000:10000]))
with open(r'image-rec\static\td3.mjs', 'w') as f:
    f.write(json.dumps(data[10000:15000], indent=4))
print(len(data[10000:15000]))
with open(r'image-rec\static\td4.mjs', 'w') as f:
    f.write(json.dumps(data[15000:20000], indent=4))
print(len(data[15000:20000]))


# with open('image-rec/static/training-data-1.json') as f:
#     data_1 = json.loads(f.read())

# with open('image-rec/static/training-data-2.json') as f:
#     data_2 = json.loads(f.read())

# with open('image-rec/static/training-data-3.json') as f:
#     data_3 = json.loads(f.read())
# print(len(data_1))
# with open('image-rec/static/training-data-i.json', 'x') as f:
#     f.write(json.dumps(data_1, indent=4))

# with open('image-rec/static/training-data-ii.json', 'x') as f:
#     f.write(json.dumps(data_2, indent=4))

# with open('image-rec/static/training-data-iii.json', 'x') as f:
#     f.write(json.dumps(data_3, indent=4))




# with open('image-rec/static/labels.json', 'r') as label_json:
#     labels = json.loads(label_json.read())

# def getMNISTImageData(i):
#     data = []
#     file = f'image-rec/static/train/{i+1}.png'
#     img = Image.open(file)
#     pix = img.load()
#     for j in range(28):
#         for k in range(28):
#             data.append(round(pix[k, j]/255*10)/10)
#     label = labels[i]
#     return [label, data]

# # print(getMNISTImageData(0))

# data_1 = []
# data_2 = []
# data_3 = []

# for i in range(0, 20000):
#     data_1.append(getMNISTImageData(i))
#     print(i)

# for i in range(20000, 40000):
#     data_2.append(getMNISTImageData(i))
#     print(i)

# for i in range(40000, 60000):
#     data_3.append(getMNISTImageData(i))
#     print(i)

# print(len(data_1))
# print(len(data_2))
# print(len(data_3))

# with open('image-rec/static/training-data-1.json', 'w') as f:
#     f.write(json.dumps(data_1))

# with open('image-rec/static/training-data-2.json', 'w') as f:
#     f.write(json.dumps(data_2))

# with open('image-rec/static/training-data-3.json', 'w') as f:
#     f.write(json.dumps(data_3))

# # with open('image-rec/static/training-data.json', 'r') as f:
# #     print(len(json.loads(f.read())))




# # new = Image.new('RGB', (28, 28), 'black')
# # newmap = new.load()
# # for i in range(len(zero)):
# #     newmap[i % 28, i // 28] = (round(zero[i]*255), round(zero[i]*255), round(zero[i]*255))
# # new.save('test.png', 'PNG')