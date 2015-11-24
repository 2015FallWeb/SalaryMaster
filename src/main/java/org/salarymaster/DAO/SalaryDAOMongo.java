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
import com.google.gson.reflect.TypeToken;
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
import org.springframework.cache.annotation.Cacheable;
import redis.clients.jedis.Jedis;

/**
 *
 * @author chanllen
 */

@Component
public class SalaryDAOMongo implements SalaryDAO{
    private final static Logger log = Logger.getLogger(SalaryDAOMongo.class);
    private final static String[] colArray = {"employer_name", "job_info_job_title", "job_info_work_city", 
        "job_info_work_state", "wage_offer_from_9089", "decision_date"};
    MongoDatabase db = null;
    private final static String EMPLOYER = "employer_name";
    private final static String TITLE = "job_info_job_title";
    private final static String CITY = "job_info_work_city";
    private final static String STATE = "job_info_work_state";
    private final static String SALARY = "wage_offer_from_9089";
    private final static String DATE = "decision_date";
    @Autowired
    ServletContext servletContext;
    
    public SalaryDAOMongo(){
        db = Connection.getDB();
    }
    @Override
    @Cacheable("salaryByName")
    public List<Salary> getSalary(String employerName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject(EMPLOYER, employerName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
   
    private static List<Salary> iterToList(FindIterable<Document> iterable, int limit){
        final List<Salary> result = new ArrayList<>();
        for(Document document : iterable){
            if(result.size() > limit){
                break;
            }
            String json = document.toJson();
            Gson gson = new Gson();
            Salary salary = gson.fromJson(json, Salary.class);
            result.add(salary);
        }
        return result;
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
    @Cacheable("salary")
    public List<Salary> getSalaryByCity(String cityName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject(CITY, cityName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }

    @Override
    @Cacheable("salary")
    public List<Salary> getSalaryByState(String stateName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject(STATE, stateName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
    
    
    @Override
    public List<Salary> getSalaryByTitle(String titleName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject(TITLE, titleName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
    
    public List<Salary> getSalaryByTitleByMongo(String titleName) {
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject(TITLE, titleName));
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }

    @Override
    public boolean updateJson() {
        
        return updateJsonFor("city", CITY) &&
                updateJsonFor("employer", EMPLOYER) &&
                 updateJsonFor("title", TITLE);
    }
    
    private boolean updateJsonFor(String name, String colName){
        log.info("update json for " + name);
        AggregateIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).aggregate(asList(
        new Document("$group", new Document("_id", "$" + colName).append("total", new Document("$sum", 1))), 
                new Document("$sort", new Document("total", -1))
        ));
        
        return FileUtil.jsonToFile(servletContext, name, iterable);
        
    }

    @Override
    public String getSalaryJsonByTitle(String titleName) {

        Gson gson = new Gson();
        String result = gson.toJson(getSalaryByTitle(titleName));
        
        return result;
    }
    
    private List<Salary> getSalaryByField(String key, String value, int start, int length, 
            int orderCol, String orderDir){
        int dir = orderDir.equals("asc") ? 1 : -1;
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(
                new BasicDBObject(key, value)).sort(new Document(colArray[orderCol], dir)).skip(start).limit(length);
        log.info("iterable: " + iterable);
        return iterToList(iterable);
    }
    
    private int getSalaryCountByField(String key, String value){
        long count = db.getCollection(Parameter.COLLECTION_SALARY).count(
                new BasicDBObject(key, value));
        log.info("count " + count);
        return (int) count;
    }
    @Override
    public List<Salary> getSalaryByCity(String cityName, int start, int length, 
            int orderCol, String orderDir) {
        return getSalaryByField(CITY, cityName, start, length, orderCol, orderDir);
    }

    @Override
    @Cacheable("salaryCount")
    public int getSalaryCountByCity(String cityName) {
        return getSalaryCountByField(CITY, cityName);
    }

    @Override
    public List<Salary> getSalaryByState(String stateName, int start, int length, 
            int orderCol, String orderDir) {
        return getSalaryByField(STATE, stateName, start, length, orderCol, orderDir);
    }
    
    @Override
    @Cacheable("salaryCount")
    public int getSalaryCountByState(String stateName) {
       return getSalaryCountByField(STATE, stateName);
    }

    @Override
    public List<Salary> getSalaryByTitle(String titleName, int start, int length, int orderCol, String orderDir) {
        return getSalaryByField(TITLE, titleName, start, length, orderCol, orderDir);
    }

    @Override
    public int getSalaryCountByTitle(String titleName) {
        return getSalaryCountByField(TITLE, titleName);
    }

    @Override
    public List<Salary> getSalaryByEmployer(String employerName, int start, int length, int orderCol, String orderDir) {
        return getSalaryByField(EMPLOYER, employerName, start, length, orderCol, orderDir);
    }

    @Override
    public int getSalaryCountByEmployer(String employerName) {
       return getSalaryCountByField(EMPLOYER, employerName);
    }

    @Override
    @Cacheable("salary")
    public List<Salary> getSalary(String employerName, String stateName, String cityName, String titleName, int start, int length, int orderCol, String orderDir) {
        
        BasicDBObject query = new BasicDBObject();
        if(employerName.length() != 0)
            query.put(EMPLOYER, employerName);
        if(stateName.length() != 0)
             query.put(STATE, stateName);
        if(cityName.length() != 0)
            query.put(CITY, cityName);
        if(titleName.length() != 0)
            query.put(TITLE, titleName);   

        int dir = orderDir.equals("asc") ? 1 : -1;
        FindIterable<Document> iterable = db.getCollection(Parameter.COLLECTION_SALARY).find(query)
                .sort(new Document(colArray[orderCol], dir)).skip(start).limit(length);
        log.info("iterable: " + iterable);
        return iterToList(iterable);

    }
    
    @Override
    @Cacheable("salaryCount")
    public int getSalaryCount(String employerName, String stateName, String cityName, String titleName) {
        BasicDBObject query = new BasicDBObject();
        if(employerName.length() != 0)
            query.put(EMPLOYER, employerName);
        if(stateName.length() != 0)
             query.put(STATE, stateName);
        if(cityName.length() != 0)
            query.put(CITY, cityName);
        if(titleName.length() != 0)
            query.put(TITLE, titleName);  
        long count = db.getCollection(Parameter.COLLECTION_SALARY).count(query);
        
        log.info("count " + count);
        return (int) count;
    }


}
