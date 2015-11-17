/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.model;

/**
 *
 * @author shaofanzhang
 */
public class Stat {
    private Double SalaryMin;
    private Double SalaryMax;
    private Double SalaryMedian;

    /**
     * @return the SalaryMin
     */
    public Double getSalaryMin() {
        return SalaryMin;
    }

    /**
     * @param SalaryMin the SalaryMin to set
     */
    public void setSalaryMin(Double SalaryMin) {
        this.SalaryMin = SalaryMin;
    }

    /**
     * @return the SalaryMax
     */
    public Double getSalaryMax() {
        return SalaryMax;
    }

    /**
     * @param SalaryMax the SalaryMax to set
     */
    public void setSalaryMax(Double SalaryMax) {
        this.SalaryMax = SalaryMax;
    }

    /**
     * @return the SalaryMedian
     */
    public Double getSalaryMedian() {
        return SalaryMedian;
    }

    /**
     * @param SalaryMedian the SalaryMedian to set
     */
    public void setSalaryMedian(Double SalaryMedian) {
        this.SalaryMedian = SalaryMedian;
    }
 
}
