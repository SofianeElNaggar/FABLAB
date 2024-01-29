import winreg

def find_software(hive, flag):
    aReg = winreg.ConnectRegistry(None, hive)
    aKey = winreg.OpenKey(aReg, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", 0, winreg.KEY_READ | flag)

    count_subkey = winreg.QueryInfoKey(aKey)[0]

    software_list = []

    for i in range(count_subkey):
        software = {}
        try:
            asubkey_name = winreg.EnumKey(aKey, i)
            asubkey = winreg.OpenKey(aKey, asubkey_name)
            software['name'] = winreg.QueryValueEx(asubkey, "DisplayName")[0]
            software_list.append(software)
        except EnvironmentError:
            continue

    return software_list

software_list = find_software(winreg.HKEY_LOCAL_MACHINE, winreg.KEY_WOW64_32KEY) + find_software(winreg.HKEY_LOCAL_MACHINE, winreg.KEY_WOW64_64KEY) + find_software(winreg.HKEY_CURRENT_USER, 0)

unwanted_list = ['Microsoft Windows','C++','.NET','Microsoft GameInput','Office','XNA','Update','Prerequisites','Maintenance','Bonjour','WebView2','Contrôle d’intégrité du PC Windows','Python']

def dell_unwanted(s_list, uw_list):
    for software in s_list:
        if "Mozilla Firefox " in software['name']:
            software['name'] = "Mozilla Firefox"
        for unwanted in uw_list:
            if unwanted in software['name'] and 'LibreOffice' not in software['name']:
                s_list.remove(software)
                break

dell_unwanted(software_list, unwanted_list)
dell_unwanted(software_list, unwanted_list)
dell_unwanted(software_list, unwanted_list)
dell_unwanted(software_list, unwanted_list)

app_list = []

for software in software_list:
    app_list.append(software['name'])

app_list = list(set(app_list))
app_list.sort()

def getApp ():
    return app_list


def printListApp ():
    a = 0
    for app in app_list:
        print(str(a) + ' : ' + app)
        a = a + 1



