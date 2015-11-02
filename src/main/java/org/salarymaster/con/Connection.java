package org.salarymaster.con;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;


public class Connection {



    public static MongoDatabase getDB(){
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(Parameter.DB_NAME);
        return db;
    }
    
    
}

