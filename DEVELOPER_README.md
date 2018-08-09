# Deployment
## Prerequisite
Install Docker

## Build and Push to Docker Hub
```
  docker image build -t movie-searcher . && \
  docker tag movie-searcher benjenkinsv95/movie-searcher && \
  docker push benjenkinsv95/movie-searcher
```



## Run Docker Image (from Docker hub)
On the production machine

### Prerequisites
This application requires [the following prerequisites](https://github.com/benjenkinsv95/personal-website/blob/master/docker_nginx_prerequisites.md) so that it can be hosted with a domain name using a secure HTTPS encryption.

### Run App in Production
Finally, run the application from DockerHub. Pulls down a fresh copy and specifies what the domain name should be.
```
docker pull benjenkinsv95/movie-searcher && \
docker run -d \
-e VIRTUAL_HOST=movie-searcher.ben-jenkins.com \
-e LETSENCRYPT_HOST=movie-searcher.ben-jenkins.com \
-e LETSENCRYPT_EMAIL=benjenkinsv95@gmail.com \
benjenkinsv95/movie-searcher
```