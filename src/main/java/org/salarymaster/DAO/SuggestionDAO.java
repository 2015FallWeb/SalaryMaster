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
public interface SuggestionDAO {
    public List<String> getSuggestion(String collection, String name, int limit);
}
