/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.util;

import java.util.Collections;
import java.util.List;
import org.salarymaster.model.Salary;

/**
 *
 * @author shaofanzhang
 */
public class Statistic {

    //Get Min, Max, and Median value of Salary
    public Double[] getStatisticInfo(List<Salary> salary){
        Double[] res = new Double[3];
    	Collections.sort(salary, null);
    	Double min = salary.get(0).getWageOfferFrom9089();
    	Double max = salary.get(salary.size()-1).getWageOfferFrom9089();
    	Double median;
        if(salary.size()%2 == 0)
            median =  0.5*(salary.get(salary.size()/2).getWageOfferFrom9089() + salary.get(salary.size()/2+1).getWageOfferFrom9089());
        else
            median = salary.get(salary.size()/2).getWageOfferFrom9089();
        res[0] = min;
        res[1] = max;
        res[2] = median;
        return res;
    }  
}

    //call:
    //    Double[] statisticInfo = new statistics().getStatisticInfo(s);
