/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.controller;

import static java.lang.Math.log;
import java.util.List;
import org.salarymaster.DAO.SalaryDAO;
import org.salarymaster.model.Salary;
import org.salarymaster.model.SalaryTable;
import org.salarymaster.model.Stat;
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
//        System.out.println("salary stat: s" + salaryList.size());
        return Statistic.getStatisticInfo(salaryList);  
    }
}