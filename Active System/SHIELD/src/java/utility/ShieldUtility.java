/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utility;

import java.util.ArrayList;
import org.json.JSONArray;

/**
 *
 * @author Franco
 */
public class ShieldUtility {

    public boolean ListIsNullOrEmpty(ArrayList list) {
        if (list == null) {
            return true;
        } else if (list.size() == 0) {
            return true;
        } else {
            return false;
        }
    }

    public ArrayList<String> jsKeywordStringToList(String str) {
        JSONArray jArray = new JSONArray(str);
        ArrayList<String> listdata = new ArrayList<String>();
        if (jArray != null) {
            for (int i = 0; i < jArray.length(); i++) {
                listdata.add(jArray.get(i).toString());
            }
        }
        return listdata;
    }
}
