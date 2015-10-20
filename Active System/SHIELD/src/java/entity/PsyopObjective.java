/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;

/**
 *
 * @author Franco
 */
public class PsyopObjective {
    private int id;
    private String type;
    private String text;
  
    //CV
    private ArrayList<Integer> cvIDList;

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
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
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
     * @return the cvIDList
     */
    public ArrayList<Integer> getCvIDList() {
        return cvIDList;
    }

    /**
     * @param cvIDList the cvIDList to set
     */
    public void setCvIDList(ArrayList<Integer> cvIDList) {
        this.cvIDList = cvIDList;
    }
}
