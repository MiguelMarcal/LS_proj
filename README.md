# LS_proj
Repository for lovelystay internship Project
In this project, we will be using commander, node and pg-promisse to 
retrieve data about users from GitHub API and store the data in a premade postgreSQL DB, using command line arguments.

It will be mandatory to have a postgresSQL DB with the folowing creation query ready to use:
		-- Droping the tables
		--
		-- DROP TABLE gh_user CASCADE; (To drop the DB if you choose to)

		-- Creating the tables
		--
		CREATE TABLE gh_user(
		    gh_name VARCHAR(50) CONSTRAINT nn_user_nome NOT NULL,
		    gh_location VARCHAR(50),
		--    
		    CONSTRAINT pk_gh_user
		    PRIMARY KEY(gh_name)
		);

The connection string used in pg-promise (Line 3 from "psql.js") must be changed to your Database parameters. (postgresql://'username':'password'@localhost:'port'/'name'

Github API requires a personal acess TOKEN to alow a reasonable amount of requests to its API, as it is possible to see in 'gh.js' lines 10 - 26 - 37 , the word 'Personal Token' in the fetch headers must be changed to a personal github token.


This Command Line Interface Aplication Can be ran with 'node main.js' and a simple explanation of how to use this tool will be displayed

It has 7 commands, here is what they do:

--	-V|--version 	--> Displays the version number
--	-h|--help	--> Displays the help menu
--	search|s <username> 	--> Dysplays the location of the user with said username and saves it to the DataBase
--	find|f		--> Finds and displays every user on the DB with location equal/similiar to the given location
--	all|a	--> Displays every user and correspondent location stored in the DataBase
--	languages|l <username>	--> Displays every repo from the given user and the languages used in it
--	help <command>	--> Displays a simple explanation of how the inputed command works


