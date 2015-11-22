/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.util;

import java.util.Collections;
import java.util.List;
import org.salarymaster.model.Salary;
import org.salarymaster.model.Stat;

/**
 *
 * @author shaofanzhang
 */
public class Statistic {

    //Get Min, Max, and Median value of Salary
    public static Stat getStatisticInfo(final List<Salary> salary) {
//        Double[] res = new Double[3];
        Stat res = new Stat();
        Collections.sort(salary, null);
        Double max = salary.get(0).getWageOfferFrom9089();
        Double min = null;
        for (int i = salary.size() - 1; i > -1; i--) {
            if (salary.get(i).getWageOfferFrom9089() >= 1000) {
                min = salary.get(i).getWageOfferFrom9089();
                break;
            }  
        }

        Double median;
        if (salary.size() % 2 == 0) {
            median = 0.5 * (salary.get(salary.size() / 2 - 1).getWageOfferFrom9089() + salary.get(salary.size() / 2).getWageOfferFrom9089());
        } else {
            median = salary.get(salary.size() / 2).getWageOfferFrom9089();
        }
        res.setSalaryMin(min);
        res.setSalaryMax(max);
        res.setSalaryMedian(median);
        return res;
    }
}

    //call:
    //    Double[] statisticInfo = new statistics().getStatisticInfo(s);
