import os

# Setup environment
old = 'r={name:"temp",production:!0,title:"temp",baseAuthURL:"temp",baseAPIURL:"temp"}'
new = 'r={name:"Marble",production:!0,title:"Marble Panel", baseAuthURL:"' + os.environ['BASE_AUTH_URL'] + '",baseAPIURL:"' + os.environ['BASE_API_URL'] + '"} '

for filename in os.listdir(os.environ['FILE_PATH']):
  if filename.endswith(".js"):
    s = open(os.environ['FILE_PATH'] + "/" + filename).read()
    s = s.replace(old, new)
    f = open(os.environ['FILE_PATH'] + "/" + filename, 'w')
    f.write(s)
    f.close()

# Setup nginx
src = open('/etc/nginx/nginx.conf', 'r')
newline = 'daemon off;'
oldlines = src.readlines()
oldlines.insert(0, newline)
src.close()

src = open('/etc/nginx/nginx.conf', 'w')
src.writelines(oldlines)
src.close()

# Start nginx
os.system('nginx')
