package org.salarymaster.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import org.jboss.logging.Logger;
import org.salarymaster.DAO.SalaryDAO;
import org.salarymaster.model.Salary;



@RestController
public class SalaryController {
    @Autowired
    private SalaryDAO salaryDao;
    private final static Logger log = Logger.getLogger(SalaryController.class);

    @RequestMapping("/salary/employer/{employerName:.+}")
    public List<Salary> getJob(@PathVariable(value="employerName") String employerName) {
        log.info("employerName: " + employerName);
        return salaryDao.getSalary(employerName);
    }
    
     @RequestMapping("/salary/title/{positionName}")
    public List<Salary> getJobByTitle(@PathVariable(value="positionName") String positionName) {
        log.info("positionName: " + positionName);
        return salaryDao.getSalaryByTitle(positionName);
    }
    
    @RequestMapping("/salary/city/{cityName}")
    public List<Salary> getJobByCity(@PathVariable(value="cityName") String cityName) {
        log.info("employerName: " + cityName);
        return salaryDao.getSalaryByCity(cityName);
    }

    
    @RequestMapping("/salary/state/{stateName}")
    public List<Salary> getJobByState(@PathVariable(value="stateName") String stateName) {
        log.info("employerName: " + stateName);
        return salaryDao.getSalaryByState(stateName);
    }
    
    @RequestMapping("/update")
    public boolean getJobByState() {
        log.info("update json");
        return salaryDao.updateJson();
    }


}

