"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
        });
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users (username,email,password) VALUES ('username2','user2@example.com','user_password');";
            const res = yield client.query(insertQuery);
            console.log('Insertion success:', res);
        }
        catch (err) {
            console.error('Error during the insertion', err);
        }
        finally {
            yield client.end();
        }
    });
}
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
        });
        yield client.connect();
        const result = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(result);
    });
}
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
        });
        try {
            yield client.connect(); // Ensure client connection is established
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log('User found:', result); // Output user data
                return result.rows[0]; // Return the user data
            }
            else {
                console.log('No user found with the given email.');
                return null; // Return null if no user was found
            }
        }
        catch (err) {
            console.error('Error during fetching user:', err);
            throw err; // Rethrow or handle error appropriately
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
//createUsersTable();
//insertData();
getUser('user2@example.com').catch(console.error);
