/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.model;

import java.io.Serializable;

/**
 *
 * @author shaofanzhang
 */
public class StatTitle implements Serializable, Comparable<StatTitle> {
    private String jobTitle;
    private Stat stat;
    private Integer count;
    /**
     * @return the jobTitle
     */
    public String getJobTitle() {
        return jobTitle;
    }

    /**
     * @param jobTitle the jobTitle to set
     */
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    /**
     * @return the stat
     */
    public Stat getStat() {
        return stat;
    }

    /**
     * @param stat the stat to set
     */
    public void setStat(Stat stat) {
        this.stat = stat;
    }

    /**
     * @return the count
     */
    public Integer getCount() {
        return count;
    }

    /**
     * @param count the count to set
     */
    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public int compareTo(StatTitle o) {
        return o.getCount().compareTo(this.getCount());
    }
}
