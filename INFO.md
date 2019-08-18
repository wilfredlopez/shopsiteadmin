#TO DEVELOP API:
run at the same time npm run ts and in another terminal run npm run dev.

#TO DEVELOP FRONTEND:
npm run dev-client

#TO DEPLOY:
make sure you change the API_URL under the react-ui/src/config file to point to the correct url of your site
from the root folder run:
git add .
git commit -am "YOUR MESSAGE"
git push heroku master
