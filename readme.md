Install dependencies:
    npm i

Install Browser Sync and Nodemon:
    npm i browser-sync -g
    npm install nodemon -g

Localhost address: http://localhost:3000/

Build Docker image:
    docker build -t johnjamison/mailer .

Run Docker container (on port 3030):
    docker run -p 3030:3030 johnjamison/mailer

Push to Docker Hub:
    docker push johnjamison/mailer

Docker server side commands:
    Pull the latest image:
        docker pull johnjamison/mailer

    Run the image:
        docker run -p 80:80 johnjamison/mailer

Serivces
https://sendgrid.com/

Used tutorials 
https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/
https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters