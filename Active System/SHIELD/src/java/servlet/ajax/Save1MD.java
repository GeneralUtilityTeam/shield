/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.MissionDAO;
import entity.Area;
import entity.Mission;
import entity.Task;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/**
 *
 * @author Dan Torres
 */
public class Save1MD extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SaveMD</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SaveMD at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //Save Mission Details from SHIELD 1
        String editorIDStr = request.getParameter("editor-id");
        String level8 = request.getParameter("level8");
        String level7 = request.getParameter("level7");
        String level6 = request.getParameter("level6");
        String level5 = request.getParameter("level5");
        String level4 = request.getParameter("level4");
        String level3 = request.getParameter("level3");
        String level2 = request.getParameter("level2");
        String level1 = request.getParameter("level1");
        String latStr = request.getParameter("lat");
        String lngStr = request.getParameter("lng");
        
        Mission mson = new Mission();
        Area area = new Area();
        mson.setId(Integer.parseInt(request.getParameter("id")));
        mson.setUserID(Integer.parseInt(request.getParameter("user-id")));
        mson.setTitle(request.getParameter("title"));
        mson.setObjective(request.getParameter("objective"));
        mson.setSituation(request.getParameter("situation"));
        mson.setCommanderIntent(request.getParameter("commander-intent"));
        mson.setConceptOfOperation(request.getParameter("concept-of-operation"));
        mson.setThemeStress(request.getParameter("theme-stress"));
        mson.setThemeAvoid(request.getParameter("theme-avoid"));
        area.setLevel8(level8);
        area.setLevel7(level7);
        area.setLevel6(level6);
        area.setLevel5(level5);
        area.setLevel4(level4);
        area.setLevel3(level3);
        area.setLevel2(level2);
        area.setLevel1(level1);
        area.setLat(Double.parseDouble(latStr));
        area.setLng(Double.parseDouble(lngStr));
        mson.setArea(area);
        
        //Tasks
        ArrayList<Task> taskList = new ArrayList<Task>();
        //TODO loop here
        mson.setTaskList(taskList);
        
        MissionDAO msonDAO = new MissionDAO();
        boolean success = msonDAO.UpdateMission(Integer.parseInt(editorIDStr), mson);
//        int x = 0;
//        ArrayList<Task> taskList = new ArrayList<Task>();
//        Task tk;
//        String element, task;
//        do {
//            element = request.getParameter("element" + x);
//            if (element != null) {
//                if (element != "") {
//                    System.out.println("Making new task " + x);
//                    tk = new Task();
//                    tk.setId(x + 1);
//                    tk.setPsyopElement(element);
//                    tk.setText(request.getParameter("task" + x));
//                    taskList.add(tk);
//                    x++;
//                }
//            } else {
//                x = -1;
//            }
//        } while (x != -1);
//        mson.setTaskList(taskList);
        JSONObject obj = new JSONObject();
        obj.put("success", success);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(obj.toString());
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
