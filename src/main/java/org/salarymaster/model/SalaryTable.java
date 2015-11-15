/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.model;

/**
 *
 * @author chanllen
 */
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("org.jsonschema2pojo")
public class SalaryTable {

@SerializedName("draw")
@Expose
private Integer draw;
@SerializedName("recordsTotal")
@Expose
private Integer recordsTotal;
@SerializedName("recordsFiltered")
@Expose
private Integer recordsFiltered;
@SerializedName("data")
@Expose
private List<Salary> data = new ArrayList<Salary>();

/**
* 
* @return
* The draw
*/
public Integer getDraw() {
return draw;
}

/**
* 
* @param draw
* The draw
*/
public void setDraw(Integer draw) {
this.draw = draw;
}

/**
* 
* @return
* The recordsTotal
*/
public Integer getRecordsTotal() {
return recordsTotal;
}

/**
* 
* @param recordsTotal
* The recordsTotal
*/
public void setRecordsTotal(Integer recordsTotal) {
this.recordsTotal = recordsTotal;
}

/**
* 
* @return
* The recordsFiltered
*/
public Integer getRecordsFiltered() {
return recordsFiltered;
}

/**
* 
* @param recordsFiltered
* The recordsFiltered
*/
public void setRecordsFiltered(Integer recordsFiltered) {
this.recordsFiltered = recordsFiltered;
}

/**
* 
* @return
* The data
*/
public List<Salary> getData() {
return data;
}

/**
* 
* @param data
* The data
*/
public void setData(List<Salary> data) {
this.data = data;
}

}