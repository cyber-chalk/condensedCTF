# get node js image
FROM node:20.17.0

# sets the working dir for this container
WORKDIR /usr/src/app 
# maybe change to ./app

# copy package.json and package-lock.json to install node dependencies
COPY package*.json ./ 
#maybe put node packages in ./app

RUN npm install

# copy the entire app directory to the container
COPY ./app ./app
#clean up node moduals because this is way to slow

RUN chmod +x /usr/src/app/app/public/stupid_flag_exe_thing

EXPOSE 8080

CMD ["npm", "start"]
