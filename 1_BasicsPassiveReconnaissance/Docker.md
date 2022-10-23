#Docker

### Docker basics
Dockerfile -> Dockerimage (almost like an image) -> run / docker-compose to run it (running dockerimage is called container)
Dockerimage can be pushed to a Registry (docker registery)  -> can be pulled and run locally. 

Some advantages: 
- easier to distribute than VM's (docker files are way smaller than VM's)
- works well with loadbalancers  (using labels in docker-compose.yaml file)


### docker-compose.yaml file
Dockerfile  docker-compose.yaml (contains all params to start. easier than "docker run x-params")


### building and starting
`docker-compose build`   build docker BETTER EXPLANATION
`docker-compose up`   start (builded) docker
`docker-compose up -d`  -> run image (assumes docker-compose.yaml file is present), (-d for 'detatched' mode (demon) to return to bash)
`docker-compose down`   stop docker
`docker-compose up --build` -> building and starting docker in one step

### helpful docker commands
`docker images`  -> list local dockers
`docker ps`  -> shows all docker process of running docker/container)
`docker network ls`  -> list network
`docker compose config`  -> will parse docker-compose file and check syntax erros



### Links

- docker-compose
  - https://docs.docker.com/compose/gettingstarted/ 


----



### Docker commands (removed if not used)
"build dockerfileXXX" -> build dockerfile 
"docker ls" -> list


"docker exec" ->  jump into docker (have UI)
"docker pull" get docker..
"docker run --rm -i -p80:80 <name>"  -> --rm clear when stopping(image no longer available), p80:80 port forwarding on port 80



####

"dig dan.idocker.hacking-lab.com"   (dig is an alternative to nslookcup)
"git clone https:///github.com/Hacking-Lab/alpine-ttyd-bash.git"

	(build manually/create image): "docker build -t cas ."   -> build manually 
	
"docker images |grep cas"   -> shows
"docker run --rm -i-t -cas"  -> run (but without port mapping)
"docker run --rm -i-t -p7681:p7681 -cas 

"docker-compose build" -> TO CHECK.. does it work?? 

"curl ivan.idocker.hacking-lab.com:7681"  (works whn port mapping is active)

"docker exec -i -t 1f44fc93da2d bash" -> now we are in docker bash (1f444** is image identifier)

 
"docker-compose up -d"  -> run image (assumes docker-compose.yaml file is present), (-d to return o bash)
