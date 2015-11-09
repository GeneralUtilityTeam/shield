/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;
import java.util.Date;
import utility.ShieldUtility;

/**
 *
 * @author Franco
 */
public class Mission {
    private int id;
    private int status;
    private int userID;
    private String title;
    private String threat;
    
    private String objective;
    private ArrayList<String> objectiveKeywordList; 
    private String situation;
    private ArrayList<String> situationKeywordList; 
    private String execution;
    private ArrayList<String> executionKeywordList; 
    private String adminAndLogistics;
    private ArrayList<String> adminAndLogisticsKeywordList; 
    private String commandAndSignal;
    private ArrayList<String> commandAndSignalKeywordList; 
    private ArrayList<String> keywordList;
    
    private Date startDT;
    private Date endDT;

    private Area area;

    private double hqLat;
    private double hqLng;
    
    public void generateFullKeywordList(){
        ShieldUtility su = new ShieldUtility();
        keywordList = new ArrayList<String>();
        if(!su.ListIsNullOrEmpty(objectiveKeywordList))
            for(String s : objectiveKeywordList)
                if(!keywordList.contains(s))
                    keywordList.add(s);
        if(!su.ListIsNullOrEmpty(situationKeywordList))
            for(String s : situationKeywordList)
                if(!keywordList.contains(s))
                    keywordList.add(s);
        if(!su.ListIsNullOrEmpty(executionKeywordList))
            for(String s : executionKeywordList)
                if(!keywordList.contains(s))
                    keywordList.add(s);
        if(!su.ListIsNullOrEmpty(adminAndLogisticsKeywordList))
            for(String s : adminAndLogisticsKeywordList)
                if(!keywordList.contains(s))
                    keywordList.add(s);
        if(!su.ListIsNullOrEmpty(commandAndSignalKeywordList))
            for(String s : commandAndSignalKeywordList)
                if(!keywordList.contains(s))
                    keywordList.add(s);
    }
    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the status
     */
    public int getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * @return the userID
     */
    public int getUserID() {
        return userID;
    }

    /**
     * @param userID the userID to set
     */
    public void setUserID(int userID) {
        this.userID = userID;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the objective
     */
    public String getObjective() {
        return objective;
    }

    /**
     * @param objective the objective to set
     */
    public void setObjective(String objective) {
        this.objective = objective;
    }

    /**
     * @return the objectiveKeywordList
     */
    public ArrayList<String> getObjectiveKeywordList() {
        return objectiveKeywordList;
    }

    /**
     * @param objectiveKeywordList the objectiveKeywordList to set
     */
    public void setObjectiveKeywordList(ArrayList<String> objectiveKeywordList) {
        this.objectiveKeywordList = objectiveKeywordList;
    }

    /**
     * @return the situation
     */
    public String getSituation() {
        return situation;
    }

    /**
     * @param situation the situation to set
     */
    public void setSituation(String situation) {
        this.situation = situation;
    }

    /**
     * @return the situationKeywordList
     */
    public ArrayList<String> getSituationKeywordList() {
        return situationKeywordList;
    }

    /**
     * @param situationKeywordList the situationKeywordList to set
     */
    public void setSituationKeywordList(ArrayList<String> situationKeywordList) {
        this.situationKeywordList = situationKeywordList;
    }

    /**
     * @return the execution
     */
    public String getExecution() {
        return execution;
    }

    /**
     * @param execution the execution to set
     */
    public void setExecution(String execution) {
        this.execution = execution;
    }

    /**
     * @return the executionKeywordList
     */
    public ArrayList<String> getExecutionKeywordList() {
        return executionKeywordList;
    }

    /**
     * @param executionKeywordList the executionKeywordList to set
     */
    public void setExecutionKeywordList(ArrayList<String> executionKeywordList) {
        this.executionKeywordList = executionKeywordList;
    }

    /**
     * @return the adminAndLogistics
     */
    public String getAdminAndLogistics() {
        return adminAndLogistics;
    }

    /**
     * @param adminAndLogistics the adminAndLogistics to set
     */
    public void setAdminAndLogistics(String adminAndLogistics) {
        this.adminAndLogistics = adminAndLogistics;
    }

    /**
     * @return the adminAndLogisticsKeywordList
     */
    public ArrayList<String> getAdminAndLogisticsKeywordList() {
        return adminAndLogisticsKeywordList;
    }

    /**
     * @param adminAndLogisticsKeywordList the adminAndLogisticsKeywordList to set
     */
    public void setAdminAndLogisticsKeywordList(ArrayList<String> adminAndLogisticsKeywordList) {
        this.adminAndLogisticsKeywordList = adminAndLogisticsKeywordList;
    }

    /**
     * @return the commandAndSignal
     */
    public String getCommandAndSignal() {
        return commandAndSignal;
    }

    /**
     * @param commandAndSignal the commandAndSignal to set
     */
    public void setCommandAndSignal(String commandAndSignal) {
        this.commandAndSignal = commandAndSignal;
    }

    /**
     * @return the commandAndSignalKeywordList
     */
    public ArrayList<String> getCommandAndSignalKeywordList() {
        return commandAndSignalKeywordList;
    }

    /**
     * @param commandAndSignalKeywordList the commandAndSignalKeywordList to set
     */
    public void setCommandAndSignalKeywordList(ArrayList<String> commandAndSignalKeywordList) {
        this.commandAndSignalKeywordList = commandAndSignalKeywordList;
    }

    /**
     * @return the startDT
     */
    public Date getStartDT() {
        return startDT;
    }

    /**
     * @param startDT the startDT to set
     */
    public void setStartDT(Date startDT) {
        this.startDT = startDT;
    }

    /**
     * @return the endDT
     */
    public Date getEndDT() {
        return endDT;
    }

    /**
     * @param endDT the endDT to set
     */
    public void setEndDT(Date endDT) {
        this.endDT = endDT;
    }

    /**
     * @return the area
     */
    public Area getArea() {
        return area;
    }

    /**
     * @param area the area to set
     */
    public void setArea(Area area) {
        this.area = area;
    }

    /**
     * @return the threat
     */
    public String getThreat() {
        return threat;
    }

    /**
     * @param threat the threat to set
     */
    public void setThreat(String threat) {
        this.threat = threat;
    }

    /**
     * @return the keywordList
     */
    public ArrayList<String> getKeywordList() {
        return keywordList;
    }

    /**
     * @param keywordList the keywordList to set
     */
    public void setKeywordList(ArrayList<String> keywordList) {
        this.keywordList = keywordList;
    }

    /**
     * @return the hqLat
     */
    public double getHqLat() {
        return hqLat;
    }

    /**
     * @param hqLat the hqLat to set
     */
    public void setHqLat(double hqLat) {
        this.hqLat = hqLat;
    }

    /**
     * @return the hqLng
     */
    public double getHqLng() {
        return hqLng;
    }

    /**
     * @param hqLng the hqLng to set
     */
    public void setHqLng(double hqLng) {
        this.hqLng = hqLng;
    }

}
