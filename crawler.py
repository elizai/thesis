import re
import urllib.request

def main():
    with open("result.txt", "wt") as text_file:
        print("Enter the URL you wish to crawl..")
        url = input("@> ")
        print(url)
        for i in re.findall(
            "href=[\"'](.[^\"']+)[\"']",
            urllib.request.urlopen(url).read().decode(), re.I):
            print(i)
            text_file.write(i + '\n')

if __name__ == '__main__':
    main()
