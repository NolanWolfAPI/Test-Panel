import os

old = 'var environment = {\n    name: \'temp\',\n    production: true,\n    title: \'temp\',\n    baseAuthURL: ' \
      '\'temp\',\n    baseAPIURL: \'temp\',\n};'
new = 'var environment = {name: \'Marble\', production: true, title: \'Marble Panel\' baseAuthURL: \'' \
      + os.environ['BASE_AUTH_URL'] + '\', baseAPIURL: \'' + os.environ['BASE_API_URL'] + '\',};'

s = open(os.environ['FILE_PATH']).read()
s = s.replace(old, new)
f = open(os.environ['FILE_PATH'], 'w')
f.write(s)
f.close()

os.system('nginx -g daemon off')
