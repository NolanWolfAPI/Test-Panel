import os


# Setup environment
old = 'var environment = {\n    name: \'temp\',\n    production: true,\n    title: \'temp\',\n    baseAuthURL: ' \
      '\'temp\',\n    baseAPIURL: \'temp\',\n};'
new = 'var environment = {name: \'Marble\', production: true, title: \'Marble Panel\' baseAuthURL: \'' \
      + os.environ['BASE_AUTH_URL'] + '\', baseAPIURL: \'' + os.environ['BASE_API_URL'] + '\',};'

s = open(os.environ['FILE_PATH']).read()
s = s.replace(old, new)
f = open(os.environ['FILE_PATH'], 'w')
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
