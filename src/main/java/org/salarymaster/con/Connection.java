package org.salarymaster.con;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import redis.clients.jedis.Jedis;


public class Connection {

    public static MongoDatabase getDB(){
        MongoClient mongoClient = new MongoClient(Parameter.HOST);
        MongoDatabase db = mongoClient.getDatabase(Parameter.DB_NAME);
        return db;
    }  
    
    public static Jedis getJD(){
        Jedis jedis = new Jedis(Parameter.HOST);
        return jedis;
    }
    
}

