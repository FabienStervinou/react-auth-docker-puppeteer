
.PHONY: install serve start restart docker-clean

start: ## Install node modules, build app and run dev server
	make install serve

restart:
	docker-compose down
	make serve

serve:
	docker-compose up --build

	## Puppeteer binary version 
	PUPPETEER_PRODUCT=firefox npm install
	docker-compose run app npm i puppeteer

	## Bcrypt bug on Docker | need to be install on the container
	docker-compose run api npm uninstall bcrypt
	docker-compose run api npm install bcrypt

docker-clean:
	docker-compose down
	docker system prune --volumes -af

install: ## Install all applications
	docker-compose run app npm i
	docker-compose run app npm audit fix
	docker-compose run api npm i