/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.DAO;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import org.apache.log4j.Logger;
import org.bson.Document;
import org.salarymaster.con.Connection;
import org.salarymaster.con.Parameter;
import org.salarymaster.model.Salary;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

/**
 *
 * @author chanllen
 */
@Component
public class SuggestionDAOMongo implements SuggestionDAO{
    private final static Logger log = Logger.getLogger(SuggestionDAO.class);
    MongoDatabase db = null;
    
    
    public SuggestionDAOMongo(){
        db = Connection.getDB();
    }
    
    @Cacheable("suggestion")
    public List<String> getSuggestion(String collection, String name, int limit) {
        String pattern = "^" + name;
        FindIterable<Document> iterable = db.getCollection(collection)
                .find(new BasicDBObject("_id", Pattern.compile(pattern, Pattern.CASE_INSENSITIVE)))
                .sort(new BasicDBObject("total", -1))
                .limit(limit);
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
    
    private static List<String> iterToList(FindIterable<Document> iterable){
        final List<String> result = new ArrayList<>();
        for(Document document : iterable){
            result.add(document.getString("_id"));
        }
        return result;
    }
}
