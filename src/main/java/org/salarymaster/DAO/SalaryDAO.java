/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.DAO;

import java.util.List;
import org.salarymaster.model.Salary;
import org.springframework.stereotype.Service;
/**
 *
 * @author chanllen
 */
@Service
public interface SalaryDAO {
    public List<Salary> getSalary(String employerName);
    
    public List<Salary> getSalaryByCity(String cityName);
    
    public List<Salary> getSalaryByState(String stateName);
    

    public List<Salary> getSalaryByTitle(String titleName);
    
    public String getSalaryJsonByTitle(String titleName);


    public boolean updateJson();
}
