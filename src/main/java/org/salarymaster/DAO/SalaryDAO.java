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
    
    public List<Salary> getSalaryByCity(String city);
    
    public List<Salary> getSalaryByState(String state);
    
    public List<Salary> getSalaryByTitle(String position);
    
    public boolean updateJson();
}
