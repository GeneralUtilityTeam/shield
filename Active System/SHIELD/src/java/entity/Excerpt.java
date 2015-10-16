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
public class Excerpt {
    private int id;
    private int sourceID;
    private int categoryID;
    private String categoryDesc;
    private String text;
    private Area area;
    
    private double strength;
    private boolean eentityEnabled;
    private int eentityClassID;

    private ArrayList<String> tagList;
    
    private Date published;
    
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
     * @return the sourceID
     */
    public int getSourceID() {
        return sourceID;
    }

    /**
     * @param sourceID the sourceID to set
     */
    public void setSourceID(int sourceID) {
        this.sourceID = sourceID;
    }

    /**
     * @return the categoryID
     */
    public int getCategoryID() {
        return categoryID;
    }

    /**
     * @param categoryID the categoryID to set
     */
    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }

    /**
     * @return the categoryDesc
     */
    public String getCategoryDesc() {
        return categoryDesc;
    }

    /**
     * @param categoryDesc the categoryDesc to set
     */
    public void setCategoryDesc(String categoryDesc) {
        this.categoryDesc = categoryDesc;
    }

    /**
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * @param text the text to set
     */
    public void setText(String text) {
        this.text = text;
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
     * @return the strength
     */
    public double getStrength() {
        return strength;
    }

    /**
     * @param strength the strength to set
     */
    public void setStrength(double strength) {
        this.strength = strength;
    }

    /**
     * @return the eentityEnabled
     */
    public boolean isEentityEnabled() {
        return eentityEnabled;
    }

    /**
     * @param eentityEnabled the eentityEnabled to set
     */
    public void setEentityEnabled(boolean eentityEnabled) {
        this.eentityEnabled = eentityEnabled;
    }

    /**
     * @return the tagList
     */
    public ArrayList<String> getTagList() {
        return tagList;
    }

    /**
     * @param tagList the tagList to set
     */
    public void setTagList(ArrayList<String> tagList) {
        this.tagList = tagList;
    }

    /**
     * @return the published
     */
    public Date getPublished() {
        return published;
    }

    /**
     * @param published the published to set
     */
    public void setPublished(Date published) {
        this.published = published;
    }

    /**
     * @return the eentityClassID
     */
    public int getEentityClassID() {
        return eentityClassID;
    }

    /**
     * @param eentityClassID the eentityClassID to set
     */
    public void setEentityClassID(int eentityClassID) {
        this.eentityClassID = eentityClassID;
    }
}