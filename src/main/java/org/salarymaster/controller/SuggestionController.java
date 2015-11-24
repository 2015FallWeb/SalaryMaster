package org.salarymaster.controller;



import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import org.jboss.logging.Logger;
import org.salarymaster.DAO.SalaryDAO;
import org.salarymaster.DAO.SuggestionDAO;
import org.salarymaster.model.Salary;
import org.salarymaster.model.SalaryTable;
import org.salarymaster.model.Suggestion;




@RestController
public class SuggestionController {
    
    private final static Logger log = Logger.getLogger(SuggestionController.class);
    
    @Autowired
    private SuggestionDAO suggestionDAO;
    
    @RequestMapping("/typehead/employer")
    public List<String> getEmployerList(@RequestParam("query")String query) {
        
        log.info("query: " + query);
        List<String> result = suggestionDAO.getSuggestion("employer", query, 5);

        
        return result;
    }



}

