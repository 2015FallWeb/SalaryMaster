/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.util;

import com.google.gson.Gson;
import com.mongodb.Block;
import com.mongodb.client.AggregateIterable;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.logging.Level;

import javax.servlet.ServletContext;
import org.apache.log4j.Logger;
import org.bson.Document;
import org.salarymaster.model.Salary;

/**
 *
 * @author chanllen
 */
public class FileUtil {
    private final static Logger log = Logger.getLogger(FileUtil.class);
    
    public static boolean jsonToFile(ServletContext ctx, String name, AggregateIterable<Document> iterable){
        
        String path = ctx.getRealPath("/json/" + name + ".json");
        try {
            FileWriter fw = new FileWriter(path);
            fw.write("{\"" + name + "\":[");
            Iterator<Document> iter = iterable.iterator();
            while(iter.hasNext()){
                fw.write(iter.next().toJson());
                if(iter.hasNext()){
                    fw.write(",");
                }
            }
        
            fw.write("]}");
            fw.flush();
            fw.close();
            log.info("Write to " + path);
        } catch (IOException ex) {
            log.error(ex);
            return false;
        }
        return true;
    }
}
