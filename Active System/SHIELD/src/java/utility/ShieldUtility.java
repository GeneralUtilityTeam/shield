/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utility;

import java.util.ArrayList;

/**
 *
 * @author Franco
 */
public class ShieldUtility {

    public boolean ListIsNullOrEmpty(ArrayList list) {
        if (list == null) {
            return true;
        }
        else if (list.size() == 0) {
            return true;
        }
        else
            return false;
    }
}
