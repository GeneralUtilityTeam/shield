/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Franco
 */
public class Config {
    private int id;
    private int valueNum;
    private String valueText;
    private boolean valueBool;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * @return the valueNum
     */
    public int getValueNum() {
        return valueNum;
    }

    /**
     * @param valueNum the valueNum to set
     */
    public void setValueNum(int valueNum) {
        this.valueNum = valueNum;
    }

    /**
     * @return the valueText
     */
    public String getValueText() {
        return valueText;
    }

    /**
     * @param valueText the valueText to set
     */
    public void setValueText(String valueText) {
        this.valueText = valueText;
    }

    /**
     * @return the valueBool
     */
    public boolean isValueBool() {
        return valueBool;
    }

    /**
     * @param valueBool the valueBool to set
     */
    public void setValueBool(boolean valueBool) {
        this.valueBool = valueBool;
    }
}
