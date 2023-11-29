#!/usr/bin/bash

user="root"
host="62.113.111.120"
# host="92.53.91.152"

echo "[*] => Removing files..."
ssh $user@$host rm -rf /var/www/demo.wmf24.ru/front
echo "[*] => Completed!"

echo "[*] => Copying files..."
scp -r ./dist $user@$host:/var/www/demo.wmf24.ru/front
echo "[*] => Completed!"


 