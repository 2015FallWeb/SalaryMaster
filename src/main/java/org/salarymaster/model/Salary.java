package org.salarymaster.model;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import java.io.Serializable;

@Generated("org.jsonschema2pojo")
public class Salary implements Serializable, Comparable<Salary> {

    @SerializedName("job_info_work_state")
    @Expose
    private String jobInfoWorkState;
    @SerializedName("employer_city")
    @Expose
    private String employerCity;
    @SerializedName("source")
    @Expose
    private String source;
    @SerializedName("employer_postal_code")
    @Expose
    private String employerPostalCode;
    @SerializedName("pw_soc_title")
    @Expose
    private String pwSocTitle;
    @SerializedName("wage_offer_unit_of_pay_9089")
    @Expose
    private String wageOfferUnitOfPay9089;
    @SerializedName("year")
    @Expose
    private String year;
    @SerializedName("job_info_major")
    @Expose
    private String jobInfoMajor;
    @SerializedName("job_info_work_city")
    @Expose
    private String jobInfoWorkCity;
    @SerializedName("employer_state")
    @Expose
    private String employerState;
    @SerializedName("job_info_education")
    @Expose
    private String jobInfoEducation;
    @SerializedName("file_source")
    @Expose
    private String fileSource;
    @SerializedName("job_info_work_postal_code")
    @Expose
    private String jobInfoWorkPostalCode;
    @SerializedName("decision_date")
    @Expose
    private String decisionDate;
    @SerializedName("pw_level_9089")
    @Expose
    private String pwLevel9089;
    @SerializedName("job_info_job_title")
    @Expose
    private String jobInfoJobTitle;
    @SerializedName("employer_country")
    @Expose
    private String employerCountry;
    @SerializedName("wage_offer_to_9089")
    @Expose
    private Double wageOfferTo9089;
    @SerializedName("wage_offer_from_9089")
    @Expose
    private Double wageOfferFrom9089;
    @SerializedName("employer_name")
    @Expose
    private String employerName;
    @SerializedName("case_number")
    @Expose
    private String caseNumber;

    /**
     *
     * @return The jobInfoWorkState
     */
    public String getJobInfoWorkState() {
        return jobInfoWorkState;
    }

    /**
     *
     * @param jobInfoWorkState The job_info_work_state
     */
    public void setJobInfoWorkState(String jobInfoWorkState) {
        this.jobInfoWorkState = jobInfoWorkState;
    }

    /**
     *
     * @return The employerCity
     */
    public String getEmployerCity() {
        return employerCity;
    }

    /**
     *
     * @param employerCity The employer_city
     */
    public void setEmployerCity(String employerCity) {
        this.employerCity = employerCity;
    }

    /**
     *
     * @return The source
     */
    public String getSource() {
        return source;
    }

    /**
     *
     * @param source The source
     */
    public void setSource(String source) {
        this.source = source;
    }

    /**
     *
     * @return The employerPostalCode
     */
    public String getEmployerPostalCode() {
        return employerPostalCode;
    }

    /**
     *
     * @param employerPostalCode The employer_postal_code
     */
    public void setEmployerPostalCode(String employerPostalCode) {
        this.employerPostalCode = employerPostalCode;
    }

    /**
     *
     * @return The pwSocTitle
     */
    public String getPwSocTitle() {
        return pwSocTitle;
    }

    /**
     *
     * @param pwSocTitle The pw_soc_title
     */
    public void setPwSocTitle(String pwSocTitle) {
        this.pwSocTitle = pwSocTitle;
    }

    /**
     *
     * @return The wageOfferUnitOfPay9089
     */
    public String getWageOfferUnitOfPay9089() {
        return wageOfferUnitOfPay9089;
    }

    /**
     *
     * @param wageOfferUnitOfPay9089 The wage_offer_unit_of_pay_9089
     */
    public void setWageOfferUnitOfPay9089(String wageOfferUnitOfPay9089) {
        this.wageOfferUnitOfPay9089 = wageOfferUnitOfPay9089;
    }

    /**
     *
     * @return The year
     */
    public String getYear() {
        return year;
    }

    /**
     *
     * @param year The year
     */
    public void setYear(String year) {
        this.year = year;
    }

    /**
     *
     * @return The jobInfoMajor
     */
    public String getJobInfoMajor() {
        return jobInfoMajor;
    }

    /**
     *
     * @param jobInfoMajor The job_info_major
     */
    public void setJobInfoMajor(String jobInfoMajor) {
        this.jobInfoMajor = jobInfoMajor;
    }

    /**
     *
     * @return The jobInfoWorkCity
     */
    public String getJobInfoWorkCity() {
        return jobInfoWorkCity;
    }

    /**
     *
     * @param jobInfoWorkCity The job_info_work_city
     */
    public void setJobInfoWorkCity(String jobInfoWorkCity) {
        this.jobInfoWorkCity = jobInfoWorkCity;
    }

    /**
     *
     * @return The employerState
     */
    public String getEmployerState() {
        return employerState;
    }

    /**
     *
     * @param employerState The employer_state
     */
    public void setEmployerState(String employerState) {
        this.employerState = employerState;
    }

    /**
     *
     * @return The jobInfoEducation
     */
    public String getJobInfoEducation() {
        return jobInfoEducation;
    }

    /**
     *
     * @param jobInfoEducation The job_info_education
     */
    public void setJobInfoEducation(String jobInfoEducation) {
        this.jobInfoEducation = jobInfoEducation;
    }

    /**
     *
     * @return The fileSource
     */
    public String getFileSource() {
        return fileSource;
    }

    /**
     *
     * @param fileSource The file_source
     */
    public void setFileSource(String fileSource) {
        this.fileSource = fileSource;
    }

    /**
     *
     * @return The jobInfoWorkPostalCode
     */
    public String getJobInfoWorkPostalCode() {
        return jobInfoWorkPostalCode;
    }

    /**
     *
     * @param jobInfoWorkPostalCode The job_info_work_postal_code
     */
    public void setJobInfoWorkPostalCode(String jobInfoWorkPostalCode) {
        this.jobInfoWorkPostalCode = jobInfoWorkPostalCode;
    }

    /**
     *
     * @return The decisionDate
     */
    public String getDecisionDate() {
        return decisionDate;
    }

    /**
     *
     * @param decisionDate The decision_date
     */
    public void setDecisionDate(String decisionDate) {
        this.decisionDate = decisionDate;
    }

    /**
     *
     * @return The pwLevel9089
     */
    public String getPwLevel9089() {
        return pwLevel9089;
    }

    /**
     *
     * @param pwLevel9089 The pw_level_9089
     */
    public void setPwLevel9089(String pwLevel9089) {
        this.pwLevel9089 = pwLevel9089;
    }

    /**
     *
     * @return The jobInfoJobTitle
     */
    public String getJobInfoJobTitle() {
        return jobInfoJobTitle;
    }

    /**
     *
     * @param jobInfoJobTitle The job_info_job_title
     */
    public void setJobInfoJobTitle(String jobInfoJobTitle) {
        this.jobInfoJobTitle = jobInfoJobTitle;
    }

    /**
     *
     * @return The employerCountry
     */
    public String getEmployerCountry() {
        return employerCountry;
    }

    /**
     *
     * @param employerCountry The employer_country
     */
    public void setEmployerCountry(String employerCountry) {
        this.employerCountry = employerCountry;
    }

    /**
     *
     * @return The wageOfferTo9089
     */
    public Double getWageOfferTo9089() {
        return wageOfferTo9089;
    }

    /**
     *
     * @param wageOfferTo9089 The wage_offer_to_9089
     */
    public void setWageOfferTo9089(Double wageOfferTo9089) {
        this.wageOfferTo9089 = wageOfferTo9089;
    }

    /**
     *
     * @return The wageOfferFrom9089
     */
    public Double getWageOfferFrom9089() {
        return wageOfferFrom9089;
    }

    /**
     *
     * @param wageOfferFrom9089 The wage_offer_from_9089
     */
    public void setWageOfferFrom9089(Double wageOfferFrom9089) {
        this.wageOfferFrom9089 = wageOfferFrom9089;
    }

    /**
     *
     * @return The employerName
     */
    public String getEmployerName() {
        return employerName;
    }

    /**
     *
     * @param employerName The employer_name
     */
    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    /**
     *
     * @return The caseNumber
     */
    public String getCaseNumber() {
        return caseNumber;
    }

    /**
     *
     * @param caseNumber The case_number
     */
    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    @Override
    public int compareTo(Salary s) {
        return Double.valueOf(s.wageOfferFrom9089).compareTo(wageOfferFrom9089);
    }

}
