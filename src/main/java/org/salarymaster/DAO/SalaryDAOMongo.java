/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.DAO;

import java.util.List;
import java.util.ArrayList;
import org.salarymaster.model.Salary;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoDatabase;
import org.apache.log4j.Logger;
import org.bson.Document;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import org.springframework.stereotype.Component;
import com.mongodb.Block;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import static java.util.Arrays.asList;
import javax.servlet.ServletContext;
import org.salarymaster.con.Connection;
import org.salarymaster.con.Parameter;
import org.salarymaster.controller.SalaryController;
import org.salarymaster.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author chanllen
 */

@Component
public class SalaryDAOMongo implements SalaryDAO{
    private final static Logger log = Logger.getLogger(SalaryDAOMongo.class);
    MongoDatabase db = null;
    
    @Autowired
    ServletContext servletContext;
    
    public SalaryDAOMongo(){
        db = Connection.getDB();
        
    }
    @Override
    public List<Salary> getSalary(String employerName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject("employer_name", employerName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
   

    private static List<Salary> iterToList(FindIterable<Document> iterable){
        final List<Salary> result = new ArrayList<>();
        
        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                String json = document.toJson();
                Gson gson = new Gson();
                Salary salary = gson.fromJson(json, Salary.class);
                result.add(salary);
            }
        });
        return result;
    }
    @Override
    public List<Salary> getSalaryByTitle(String positionName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject("job_info_work_title", positionName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
    
    @Override
    public List<Salary> getSalaryByCity(String cityName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject("job_info_work_city", cityName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }

    @Override
    public List<Salary> getSalaryByState(String stateName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject("job_info_work_state", stateName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }

    @Override
    public boolean updateJson() {
        
        return updateJsonFor("city", "job_info_work_city") &&
                updateJsonFor("employer", "employer_name") &&
                 updateJsonFor("title", "job_info_job_title");
    }
    
    private boolean updateJsonFor(String name, String colName){
        AggregateIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).aggregate(asList(
                
        new Document("$group", new Document("_id", "$" + colName).append("total", new Document("$sum", 1))), 
                new Document("$sort", new Document("total", -1))
        ));
        
        return FileUtil.jsonToFile(servletContext, name, iterable);
        
    }
}
