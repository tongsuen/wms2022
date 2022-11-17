# WMS
deploy on UBANTU EC2 AWS

## update software on server and install yarn

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn

## install web server
sudo apt install git nginx
sudo service nginx start
## locate to config file server
cd /etc/nginx/sites-enabled
## edit default file and see html file location ex. /var/www/html/
sudo nano default

## clone project to ubuntu
cd ~
sudo git clone https://github.com/tongsuen/wms2022.git
cd wms2022
## install node https://github.com/nodesource/distributions look for version we need and copy link
sudo curl -fsSL https://deb.nodesource.com/setup_16.15.1 | sudo -E bash - &&\
sudo apt-get install -y nodejs

## now go inside backend folder
sudo yarn
## go to client and build
cd client
sudo yarn run build
## create folder in www for serve frontend file
cd /var/www/
sudo mkdir frontend
sudo chown -R ubuntu frontend/

##move file to new frontend folder
sudo cp -r ~/wms2022/client/build/* /var/www/frontend/
##checking
ls
cd frontend
ls
## your will see folder structure like this
--frontend
    -asset....
    -index.html
    -static
    ...etc

# change point location to fronted
cd /etc/nginx/sites-enabled/
sudo nano default
## root /var/www/ => root /var/www/frontend;
## save and run
sudo service nginx reload
## now check url to correct frontend ui

## install pm2 for run service in background
cd ~
sudo npm install pm2 -g
cd wms2022
sudo pm2 start server.js --name "api-service"
cd /etc/nginx/sites-enabled/
sudo nano default
## add under 
location / {
    try_files $uri $uri/ /index.html;
}
location /api/ {
    proxy_pass http://localhost:5000;
}
location /socket.io/ {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_set_header Host $host;
            proxy_pass http://localhost:5000/socket.io/;
}
##save and reload
sudo service nginx reload








