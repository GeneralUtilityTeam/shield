/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Franco
 */
public class Mission {
    private int id;
    private int status;
    private int userID;
    private String title;
    private String objective;
    private double lat;
    private double lng;
    private String area;
    private int scope;
    private Date startDT;
    private Date endDT;
    private String situation;
    private String commanderIntent;
    private String conceptOfOperation;
    private String themeStress;
    private String themeAvoid;
    private ArrayList<Task> taskList;
    
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
     * @return the lat
     */
    public double getLat() {
        return lat;
    }

    /**
     * @param lat the lat to set
     */
    public void setLat(double lat) {
        this.lat = lat;
    }

    /**
     * @return the lng
     */
    public double getLng() {
        return lng;
    }

    /**
     * @param lng the lng to set
     */
    public void setLng(double lng) {
        this.lng = lng;
    }

    /**
     * @return the scope
     */
    public int getScope() {
        return scope;
    }

    /**
     * @param scope the scope to set
     */
    public void setScope(int scope) {
        this.scope = scope;
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
     * @return the commanderIntent
     */
    public String getCommanderIntent() {
        return commanderIntent;
    }

    /**
     * @param commanderIntent the commanderIntent to set
     */
    public void setCommanderIntent(String commanderIntent) {
        this.commanderIntent = commanderIntent;
    }

    /**
     * @return the conceptOfOperation
     */
    public String getConceptOfOperation() {
        return conceptOfOperation;
    }

    /**
     * @param conceptOfOperation the conceptOfOperation to set
     */
    public void setConceptOfOperation(String conceptOfOperation) {
        this.conceptOfOperation = conceptOfOperation;
    }

    /**
     * @return the themeStress
     */
    public String getThemeStress() {
        return themeStress;
    }

    /**
     * @param themeStress the themeStress to set
     */
    public void setThemeStress(String themeStress) {
        this.themeStress = themeStress;
    }

    /**
     * @return the themeAvoid
     */
    public String getThemeAvoid() {
        return themeAvoid;
    }

    /**
     * @param themeAvoid the themeAvoid to set
     */
    public void setThemeAvoid(String themeAvoid) {
        this.themeAvoid = themeAvoid;
    }

    /**
     * @return the area
     */
    public String getArea() {
        return area;
    }

    /**
     * @param area the area to set
     */
    public void setArea(String area) {
        this.area = area;
    }

    /**
     * @return the taskList
     */
    public ArrayList<Task> getTaskList() {
        return taskList;
    }

    /**
     * @param taskList the taskList to set
     */
    public void setTaskList(ArrayList<Task> taskList) {
        this.taskList = taskList;
    }
    
    
}
