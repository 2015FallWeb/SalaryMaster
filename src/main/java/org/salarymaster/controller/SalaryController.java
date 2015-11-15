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
import org.salarymaster.model.SalaryTable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;



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
    
//    @RequestMapping("/salary/city/{cityName}")
//    public List<Salary> getJobByCity(@PathVariable(value="cityName") String cityName) {
//        log.info("cityName: " + cityName);
//        return salaryDao.getSalaryByCity(cityName);
//    }
//    
    @RequestMapping("/salary/city/{cityName}")
    public SalaryTable getJobByCity(@PathVariable(value="cityName") String cityName, 
            @RequestParam("start") int start, @RequestParam("length") int length, 
            @RequestParam("draw") int draw, @RequestParam("order[0][column]")int orderCol, 
            @RequestParam("order[0][dir]")String orderDir) {
        log.info("cityName: " + cityName + ", start:" + start + ", length: " + length + ", draw: " + draw + ", orderCol: " + orderCol + ", orderDir: " + orderDir);
        SalaryTable table = new SalaryTable();
        List<Salary> list = salaryDao.getSalaryByCity(cityName, start, length, orderCol, orderDir);
        int count = salaryDao.getSalaryCountByCity(cityName);
        table.setData(list);
        table.setRecordsTotal(count);
        table.setRecordsFiltered(count);
        table.setDraw(draw);
        return table;
    }

    
    @RequestMapping("/salary/state/{stateName}")
    public List<Salary> getJobByState(@PathVariable(value="stateName") String stateName) {
        log.info("stateName: " + stateName);
        return salaryDao.getSalaryByState(stateName);
    }
    
    @RequestMapping("/salary/title/{titleName}")
    public List<Salary> getJobByTitle(@PathVariable(value="titleName") String titleName) {
        log.info("titleName: " + titleName);
        return salaryDao.getSalaryByTitle(titleName);
    }

//    @RequestMapping("/salary/title/{titleName}")
//    public ResponseEntity<String> getJobByTitle(@PathVariable(value="titleName") String titleName) {
//        
//        log.info("titleName: " + titleName);
//        String json = salaryDao.getSalaryJsonByTitle(titleName);
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
//        return new ResponseEntity<String>(json, responseHeaders, HttpStatus.CREATED);
//        
//    }

    @RequestMapping("/update")
    public boolean update() {
        log.info("update json");
        return salaryDao.updateJson();
    }


}

