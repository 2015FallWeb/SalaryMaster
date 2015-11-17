package org.salarymaster.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import org.jboss.logging.Logger;
import org.salarymaster.DAO.SalaryDAO;
import org.salarymaster.model.Salary;
import org.salarymaster.model.SalaryTable;




@RestController
public class SalaryController {
    @Autowired
    private SalaryDAO salaryDao;
    private final static Logger log = Logger.getLogger(SalaryController.class);
    
    @RequestMapping("/salary/search")
    public SalaryTable getJob(@RequestParam(value="employerName") String employerName,
            @RequestParam(value="stateName") String stateName, @RequestParam(value="cityName") String cityName,
            @RequestParam(value="titleName") String titleName,
            @RequestParam("start") int start, @RequestParam("length") int length, 
            @RequestParam("draw") int draw, @RequestParam("order[0][column]")int orderCol, 
            @RequestParam("order[0][dir]")String orderDir) {
        
        log.info("employerName: " + employerName + " stateName: " + stateName + " cityName: " + cityName + " titleName: " + titleName + 
                ", start:" + start + ", length: " + length + ", draw: " + draw + ", orderCol: " + orderCol + ", orderDir: " + orderDir);
        SalaryTable table = new SalaryTable();
        List<Salary> list = salaryDao.getSalary(employerName, stateName, cityName, titleName, start, length, orderCol, orderDir);
        int count = salaryDao.getSalaryCount(employerName, stateName, cityName, titleName);
        table.setData(list);
        table.setRecordsTotal(count);
        table.setRecordsFiltered(count);
        table.setDraw(draw);
        return table;
    }
    
    @RequestMapping("/salary/employer/{employerName:.+}")
    public SalaryTable getJobByEmployer(@PathVariable(value="employerName") String employerName,
        @RequestParam("start") int start, @RequestParam("length") int length, 
            @RequestParam("draw") int draw, @RequestParam("order[0][column]")int orderCol, 
            @RequestParam("order[0][dir]")String orderDir) {
        
        log.info("employerName: " + employerName + ", start:" + start + ", length: " + length + ", draw: " + draw + ", orderCol: " + orderCol + ", orderDir: " + orderDir);
        SalaryTable table = new SalaryTable();
        List<Salary> list = salaryDao.getSalaryByEmployer(employerName, start, length, orderCol, orderDir);
        int count = salaryDao.getSalaryCountByEmployer(employerName);
        table.setData(list);
        table.setRecordsTotal(count);
        table.setRecordsFiltered(count);
        table.setDraw(draw);
        return table;
    }

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
    public SalaryTable getJobByState(@PathVariable(value="stateName") String stateName,
            @RequestParam("start") int start, @RequestParam("length") int length, 
            @RequestParam("draw") int draw, @RequestParam("order[0][column]")int orderCol, 
            @RequestParam("order[0][dir]")String orderDir) {
        
        log.info("stateName: " + stateName + ", start:" + start + ", length: " + length + ", draw: " + draw + ", orderCol: " + orderCol + ", orderDir: " + orderDir);
        SalaryTable table = new SalaryTable();
        List<Salary> list = salaryDao.getSalaryByState(stateName, start, length, orderCol, orderDir);
        int count = salaryDao.getSalaryCountByState(stateName);
        table.setData(list);
        table.setRecordsTotal(count);
        table.setRecordsFiltered(count);
        table.setDraw(draw);
        return table;
    }
    
    @RequestMapping("/salary/title/{titleName}")
    public SalaryTable getJobByTitle(@PathVariable(value="titleName") String titleName,
            @RequestParam("start") int start, @RequestParam("length") int length, 
            @RequestParam("draw") int draw, @RequestParam("order[0][column]")int orderCol, 
            @RequestParam("order[0][dir]")String orderDir) {
        
        log.info("titleName: " + titleName + ", start:" + start + ", length: " + length + ", draw: " + draw + ", orderCol: " + orderCol + ", orderDir: " + orderDir);
        SalaryTable table = new SalaryTable();
        List<Salary> list = salaryDao.getSalaryByTitle(titleName, start, length, orderCol, orderDir);
        int count = salaryDao.getSalaryCountByTitle(titleName);
        table.setData(list);
        table.setRecordsTotal(count);
        table.setRecordsFiltered(count);
        table.setDraw(draw);
        return table;
    }

    @RequestMapping("/update")
    public boolean update() {
        log.info("update json");
        return salaryDao.updateJson();
    }


}

