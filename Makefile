install: node_modules
	docker run --name postgres -p 5432:5432 -u postgres -e POSTGRES_PASSWORD=postgres -d postgres && sleep 20 && npx knex migrate:latest && npm install 

all: install
	npm start
	
node_modules: package.json
