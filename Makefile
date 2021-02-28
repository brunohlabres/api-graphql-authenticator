install: node_modules
	docker run --name postgres -p 5432:5432 -u postgres -e POSTGRES_PASSWORD=postgres -d postgres && sleep 20 && npm install  && npx knex migrate:latest

all: install
	npm start
	
node_modules: package.json
