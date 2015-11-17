/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.controller;

import static java.lang.Math.log;
import java.util.*;
import org.salarymaster.DAO.SalaryDAO;
import org.salarymaster.model.Salary;
import org.salarymaster.model.SalaryTable;
import org.salarymaster.model.Stat;
import org.salarymaster.model.StatTitle;
import org.salarymaster.util.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author shaofanzhang
 */
@RestController
public class StatController {
    @Autowired
    private SalaryDAO salaryDao;
    
    @RequestMapping("/statistics/{employerName}")
    public Stat getStatByEmployer(@PathVariable(value="employerName") String employerName){
        List<Salary> salaryList = salaryDao.getSalary(employerName);
        if(salaryList != null && salaryList.size()>0)
            return Statistic.getStatisticInfo(salaryList); 
        return null;
    }
    
    @RequestMapping("/titleStatistics/{employerName}")
    public List<StatTitle> getStatByTitleByEmployer(@PathVariable(value="employerName") String employerName){
        List<Salary> salaryList = salaryDao.getSalary(employerName);
        Map<String, List<Salary>> titleMap = new HashMap<String, List<Salary>>();
        List<StatTitle> res = new ArrayList<StatTitle>();
        for(Salary s: salaryList){
            String jobTitle = s.getJobInfoJobTitle();
            if(titleMap.containsKey(jobTitle)){      
                titleMap.get(jobTitle).add(s);
            }else{
                List<Salary> titleSList = new ArrayList<Salary>();
                titleSList.add(s);
                titleMap.put(jobTitle, titleSList);
            }   
        }
        
        for (Map.Entry<String, List<Salary>> entry : titleMap.entrySet()) {   
            String title = entry.getKey();
            List<Salary> salaryByTitle = entry.getValue();
            System.out.println("salarylist size: "+salaryByTitle.size());
            if(salaryByTitle != null && salaryByTitle.size()>0){
                StatTitle st = new StatTitle();
                st.setCount(salaryByTitle.size());
                Stat stat = Statistic.getStatisticInfo(entry.getValue());
                st.setStat(stat);
                st.setJobTitle(title);
           
                res.add(st);
            }
       
        }
         return res;
    }       
}
